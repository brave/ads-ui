import { buildAdServerEndpoint, getEnvConfig } from "@/util/environment";
import { useCallback, useState } from "react";
import _ from "lodash";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import {
  AdvertiserImagesDocument,
  CampaignFormat,
  UploadAdvertiserImageDocument,
} from "@/graphql-client/graphql";
import { UploadConfig } from "@/components/Assets/UploadImage";
import { t } from "@lingui/macro";
import { useMutation } from "@apollo/client";

interface PutUploadResponse {
  // the pre-signed url to which the file should be uploaded to
  uploadUrl: string;
  // the path on the cdn that this url will eventually have
  destinationPath: string;
}

interface Props {
  onComplete?: (data: string) => void;
}

export const useUploadFile = ({ onComplete }: Props = {}) => {
  const { advertiser } = useAdvertiser();
  const [url, setUrl] = useState<string>();
  const [error, setError] = useState<string>();
  const [step, setStep] = useState<number>(0);
  const [state, setState] = useState<string>();
  const [loading, setLoading] = useState(false);

  const [mutate] = useMutation(UploadAdvertiserImageDocument, {
    refetchQueries: [
      { query: AdvertiserImagesDocument, variables: { id: advertiser.id } },
    ],
    onError(e) {
      setError(e.message);
      setLoading(false);
      setStep(0);
    },
    onCompleted(data) {
      const fileName = data.createAdvertiserImage.name;
      setStep(2);
      setState(t`File upload complete for "${fileName}"`);
      setLoading(false);
      if (onComplete && url) onComplete(url);
    },
  });

  const uploadFile = useCallback(async (file: File, format: CampaignFormat) => {
    setLoading(true);
    setState(t`Preparing file for upload...`);

    let upload: PutUploadResponse;
    try {
      const extension = _.last(file.name.split(".")) ?? "";
      upload = await prepareForUpload(extension, advertiser.id);
    } catch (e: any) {
      setError(e.message);
      setStep(0);
      setLoading(false);
      return;
    }

    try {
      setState(t`Uploading file...`);
      await putFile(file, upload);
      setStep(1);
    } catch (e: any) {
      setError(e.message);
      setStep(0);
      setLoading(false);
      return;
    }

    const imageUrl = `https://${configForFormat(format).targetHost()}${
      upload.destinationPath
    }`;
    setUrl(imageUrl);
    await mutate({
      variables: {
        input: {
          format: format,
          advertiserId: advertiser.id,
          name: file.name,
          imageUrl,
        },
      },
    });
  }, []);

  const resetForm = useCallback(() => {
    setState(undefined);
    setStep(0);
    setError(undefined);
    setLoading(false);
  }, []);

  return [
    { upload: uploadFile, reset: resetForm },
    { state, step, loading, error },
  ];
};

async function prepareForUpload(
  extension: string,
  advertiserId: string,
): Promise<PutUploadResponse> {
  const resp = await fetch(
    buildAdServerEndpoint(
      `/internal/image-upload/${extension}?advertiser_id=${encodeURIComponent(
        advertiserId,
      )}`,
    ),
    {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const unableToUpload = t`Unable to upload image`;
  if (!resp.ok) {
    throw new Error(unableToUpload);
  }
  const result = (await resp.json()) as PutUploadResponse;
  if (!result.destinationPath || !result.uploadUrl) {
    throw new Error(unableToUpload);
  }

  return result;
}

async function putFile(file: File, uploadTarget: PutUploadResponse) {
  try {
    const resp = await fetch(uploadTarget.uploadUrl, {
      method: "PUT",
      mode: "cors",
      body: file,
    });

    if (!resp.ok) {
      throw new Error(t`Failed to upload image`);
    }
  } catch (e: any) {
    if (e.message === "Failed to fetch") {
      throw new Error(t`Failed to Fetch`);
    }
    throw e;
  }
}

const configForFormat = (format: CampaignFormat): UploadConfig => {
  if (format === CampaignFormat.NewsDisplayAd) {
    return {
      targetHost: () => getEnvConfig().pcdnHost,
      requiresPublishStep: false,
      endpoint: "internal/image-upload",
    };
  }

  throw new Error(t`Invalid format`);
};
