import * as React from "react";
import { Text } from "../../../components/Text/Text";
import * as S from "./CampaignTable.style";
import { Link } from "react-router-dom";
import { Icon } from "@material-ui/core";

interface ICampaignTableProps {
  campaigns: any;
  match: any;
  auth: any;
  data: any;
}

interface ICampaignTableState {
  data: any;
  currentPage: any;
  campaignsPerPage: any;
}

const linkStyle = { textDecoration: "none", color: "inherit" };

export default class CampaignTable extends React.Component<ICampaignTableProps, ICampaignTableState> {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      campaignsPerPage: 10
    };
    this.handleClick = this.handleClick.bind(this);
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  incrementPage() {
    if (this.state.currentPage < Math.ceil(this.props.data.length / this.state.campaignsPerPage)) {
      this.setState({ currentPage: this.state.currentPage + 1 })
    }
  }

  decrementPage() {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 })
    }
  }

  public render() {
    const pageNumbers = [] as number[];
    for (let i = 1 as number; i <= Math.ceil(this.props.data.length / this.state.campaignsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      if (number === this.state.currentPage) {
        return (
          <li
            key={number}
            id={number.toString()}
            onClick={this.handleClick}
            style={{ display: "flex", cursor: 'pointer', marginLeft: "4px", marginRight: "4px" }}
          >
            {number} of {Math.ceil(this.props.data.length / this.state.campaignsPerPage)}
          </li>
        );
      }
    });
    return (

      <React.Fragment>
        <React.Fragment>
          <S.TableHeader>
            <S.HeaderCell>
              <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
                Brand
            </Text>
            </S.HeaderCell>
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
                Start Date
            </Text>
            </S.HeaderCell>
            <S.HeaderCell>
              <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
                End Date
            </Text>
            </S.HeaderCell>
            <S.HeaderCell>
              <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
                Views
            </Text>
            </S.HeaderCell>
            <S.HeaderCell>
              <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
                Lands
            </Text>
            </S.HeaderCell>
            <S.HeaderCell>
              <Text fontFamily={"Poppins"} fontWeight={500} color={"#7c7d8c"} sizes={[13, 13, 13, 13, 13]}>
                Pacing
            </Text>
            </S.HeaderCell>
          </S.TableHeader>
          <TableRows data={this.props.data} currentPage={this.state.currentPage} campaignsPerPage={this.state.campaignsPerPage} />
        </React.Fragment>
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", paddingTop: "28px", paddingRight: '14px' }}>
          <Icon style={{ cursor: "pointer" }} onClick={this.decrementPage}>chevron_left</Icon>
          <ul style={{ display: "flex", marginTop: "3.5px", paddingLeft: "0" }}>
            {renderPageNumbers}
          </ul>
          <Icon style={{ cursor: "pointer" }} onClick={this.incrementPage}>chevron_right</Icon>
        </div>
      </React.Fragment>
    );
  }
}

function Status(state) {
  switch (state) {
    case 'active':
      return (<div style={{ display: "flex" }}>
        <S.ActiveSymbol />
        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
          {state.charAt(0).toUpperCase() + state.slice(1)}
        </Text>
      </div>)
    case 'under_review':
      return (<div style={{ display: "flex" }}>
        <S.PendingSymbol />
        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
          Review
          </Text>
      </div>)
    default:
      return (<div style={{ display: "flex" }}>
        <S.PendingSymbol />
        <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
          {state.charAt(0).toUpperCase() + state.slice(1)}
        </Text>
      </div>)
  }
}

function Pacing(index) {

  if (index >= 1.50) {
    return (<React.Fragment>
      <Text color={"#fc4145"} fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {index.toFixed(2)}
      </Text>
    </React.Fragment>)
  }
  else if (index >= 0.50 && index <= 1.50) {
    return (<React.Fragment>
      <Text color={"#07C806"} fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {index.toFixed(2)}
      </Text>
    </React.Fragment>)
  }
  else if (index > 0.01 && index <= 0.50) {
    return (<React.Fragment>
      <Text color={"#fc4145"} fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        {index.toFixed(2)}
      </Text>
    </React.Fragment>)
  }
  else {
    return (<React.Fragment>
      <Text color={"#1C1C1C"} fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
        N/A
      </Text>
    </React.Fragment>)
  }
}

function TableRows(props) {
  const { data, currentPage, campaignsPerPage } = props;
  // Logic for displaying todos
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = data.slice(indexOfFirstCampaign, indexOfLastCampaign);
  const tableRows = currentCampaigns.map((campaign, index) =>
    // <Link style={linkStyle} to={`/admin/main/users/${campaign.userId}/advertiser/${campaign.advertiserId}/campaign/${campaign.id}`}>
    <S.TableRow key={index}>
      <S.RowCell>
        <div>
          <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
            {campaign.brand}
          </Text>
        </div>
      </S.RowCell>
      <S.RowCell>
        <div>
          <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
            {campaign.name}
          </Text>
        </div>
      </S.RowCell>
      <S.RowCell>
        <div style={{ display: "flex", alignItems: "center" }}>
          {
            Status(campaign.state)
          }
        </div>
      </S.RowCell>
      <S.RowCell>
        <div>
          {campaign.currency === "USD" ?
            <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
              ${parseFloat(campaign.budget).toLocaleString('en')}
            </Text> :
            <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
              {parseFloat(campaign.budget).toLocaleString('en')} BAT
          </Text>
          }
        </div>
      </S.RowCell>
      <S.RowCell>
        <div>
          <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
            {new Date(campaign.startAt).toLocaleDateString("en-US")}
          </Text>
        </div>
      </S.RowCell>
      <S.RowCell>
        <div>
          <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
            {new Date(campaign.endAt).toLocaleDateString("en-US")}
          </Text>
        </div>
      </S.RowCell>
      <S.RowCell>
        <div>
          <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
            {parseInt(campaign.view).toLocaleString('en')}
          </Text>
        </div>
      </S.RowCell>
      <S.RowCell>
        <div>
          <Text fontFamily={"Muli"} sizes={[15, 15, 15, 15, 15]}>
            {parseInt(campaign.landed).toLocaleString('en')}
          </Text>
        </div>
      </S.RowCell>
      <S.RowCell>
        <Text color={"#07C806"} fontFamily={"Muli"} sizes={[16, 16, 24, 24, 24]}>
          {Pacing(parseFloat(campaign.pacingIndex))}
        </Text>
      </S.RowCell>
    </S.TableRow>
    // </Link>
  );

  return (
    <div>{tableRows}</div>
  )
}
