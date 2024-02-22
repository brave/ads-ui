// Copyright (c) 2020 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// FROM: https://github.com/brave/brave-core/blob/976e81322aab22de9bb3670f2cec23da76a1600f/components/brave_extension/extension/brave_extension/background/today/privateCDN.ts

import { useEffect, useRef, useState } from "react";
import { t } from "@lingui/macro";

export function useGetImagePreviewUrl(props: { url: string }) {
  const [data, setData] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const tries = useRef(0);

  const fetchImageResource = async (): Promise<ArrayBuffer | null> => {
    const result = await fetchResource(props.url);
    if (result.ok) {
      return await result.arrayBuffer();
    }

    return await new Promise((resolve) => {
      const intrvl = setInterval(async () => {
        const result = await fetchResource(props.url);
        if (result.status === 200) {
          clearInterval(intrvl);
          resolve(await result.arrayBuffer());
        }

        tries.current = tries.current + 1;
        if (result.status !== 403 || tries.current > 10) {
          clearInterval(intrvl);
          resolve(null);
        }
      }, 2000);
    });
  };

  useEffect(() => {
    async function fetchImage(url: string) {
      if (!url.endsWith(".pad")) {
        setData(url);
        return;
      }
      setLoading(true);

      const blob = await fetchImageResource();
      if (!blob) {
        setError(t`Failed to load image`);
        setLoading(false);
        return;
      }

      getUnpaddedAsDataUrl(blob)
        .then((res) => {
          setData(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    fetchImage(props.url);
  }, [props.url]);

  return { data, loading, error };
}

async function fetchResource(url: string): Promise<Response> {
  try {
    const response = await fetch(url, {
      headers: new Headers({
        "Accept-Language": "*",
      }),
      cache: "no-cache",
    });
    return response;
  } catch (e) {
    return new Response(null, { status: 502 });
  }
}

async function getUnpaddedAsDataUrl(
  buffer: ArrayBuffer,
  mimeType = "image/jpg",
): Promise<string> {
  const data = new DataView(buffer);
  const contentLength = data.getUint32(0, false /* big endian */);
  const unpaddedData = buffer.slice(4, contentLength + 4);
  const unpaddedBlob = new Blob([unpaddedData], { type: mimeType });
  return await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(unpaddedBlob);
  });
}
