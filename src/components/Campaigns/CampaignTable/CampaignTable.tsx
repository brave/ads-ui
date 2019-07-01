import * as React from "react";
import { Text } from "../../../components/Text/Text";
import * as S from "./CampaignTable.style";

interface ICampaignTableProps {
  campaigns: any;
  match: any;
}

const rowTheme = {
  "font-size": "15px",
  "margin-left": "24px",
  opacity: ".7",
  padding: "10px"
};

export default class CampaignTable extends React.Component<ICampaignTableProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <React.Fragment>
        <S.TableHeader>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Campaign
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Status
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Budget
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Views
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Clicks
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              CTR
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Lands
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              LTR
            </Text>
          </S.HeaderCell>
          <S.HeaderCell>
            <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
              Spend
            </Text>
          </S.HeaderCell>
        </S.TableHeader>
        <S.TableRow>
          <S.RowCell>
            <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
              {" "}
              Nintendo
            </Text>
          </S.RowCell>
          <S.RowCell>
            <div style={{ display: "flex", alignItems: "center" }}>
              <S.ActiveSymbol />
              <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
                Active
              </Text>
            </div>
          </S.RowCell>
          <S.RowCell>
            <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
              $10,000.00
            </Text>
          </S.RowCell>
          <S.RowCell>
            <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
              100,000
            </Text>
          </S.RowCell>
          <S.RowCell>
            <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
              24,000
            </Text>
          </S.RowCell>
          <S.RowCell>
            <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
              10,000
            </Text>
          </S.RowCell>
          <S.RowCell>
            <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
              1-1-19
            </Text>
          </S.RowCell>
          <S.RowCell>
            <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
              12-1-19
            </Text>
          </S.RowCell>
          <S.RowCell>
            <Text fontFamily={"Muli"} sizes={[16, 16, 16, 16, 16]}>
              $2,000
            </Text>
          </S.RowCell>
        </S.TableRow>
      </React.Fragment>
    );
  }
}
