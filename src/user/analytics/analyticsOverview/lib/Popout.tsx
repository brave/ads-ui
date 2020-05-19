/** @jsx jsx */
import { Component } from 'react';
import { jsx } from '@emotion/core';

import Select from 'react-select';
import { defaultTheme } from 'react-select';

import { Text } from "../../../../components/Text/Text";
import { Icon } from "@material-ui/core";

const { colors } = defaultTheme;

const selectStyles = {
    control: provided => ({ ...provided, minWidth: 240, margin: 8 }),
    menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
};

type State = { isOpen: boolean, value: any };

export default class PopoutExample extends Component<any, State> {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, value: props.initialValue };
    }

    toggleOpen = () => {
        this.setState(state => ({ isOpen: !state.isOpen }));
    };
    onSelectChange = value => {
        this.toggleOpen();
        this.setState({ value });
        this.props.setMetric1(value.value)
    };
    render() {
        const { isOpen, value }: any = this.state;
        return (
            <Dropdown
                isOpen={isOpen}
                onClose={this.toggleOpen}
                target={
                    <div onClick={this.toggleOpen}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "7px", cursor: "pointer" }}>
                            <Text style={{ marginBottom: "2px" }} content={value?.label} fontFamily={"Muli"} sizes={[18, 18, 42, 42, 14]} />
                            <Icon style={{ fontSize: "22px", marginLeft: "0px" }}>arrow_drop_down</Icon>
                        </div>
                    </div>
                }
            >
                <Select
                    autoFocus
                    backspaceRemovesValue={false}
                    components={{ DropdownIndicator, IndicatorSeparator: null }}
                    controlShouldRenderValue={false}
                    hideSelectedOptions={false}
                    isClearable={false}
                    menuIsOpen
                    onChange={this.onSelectChange}
                    options={[{ value: "impressions", label: "Impressions" }, { value: "clicks", label: "Clicks" }, { value: "ctr", label: "CTR" }, { value: "landings", label: "10s Landings" }, { value: "conversions", label: "Conversions" }, { value: "dismissals", label: "Dismissals" }, { value: "upvotes", label: "Upvotes" }, { value: "downvotes", label: "Downvotes" }, { value: "convRate", label: "Conversion Rate" }, { value: "landingRate", label: "10s Landing Rate" }]}
                    styles={selectStyles}
                    tabSelectsValue={false}
                />
            </Dropdown>
        );
    }
}

// styled components

const Menu = props => {
    const shadow = 'hsla(218, 50%, 10%, 0.1)';
    return (
        <div
            css={{
                backgroundColor: 'white',
                borderRadius: 4,
                boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
                marginTop: 8,
                position: 'absolute',
                zIndex: 2,
            }}
            {...props}
        />
    );
};
const Blanket = props => (
    <div
        css={{
            bottom: 0,
            left: 0,
            top: 0,
            right: 0,
            position: 'fixed',
            zIndex: 1,
        }}
        {...props}
    />
);
const Dropdown = ({ children, isOpen, target, onClose }) => (
    <div css={{ position: 'relative' }}>
        {target}
        {isOpen ? <Menu>{children}</Menu> : null}
        {isOpen ? <Blanket onClick={onClose} /> : null}
    </div>
);
const Svg = p => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        focusable="false"
        role="presentation"
        {...p}
    />
);
const DropdownIndicator = () => (
    <div css={{ color: colors.neutral20, height: 24, width: 32 }}>
        <Svg>
            <path
                d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </Svg>
    </div>
);
const ChevronDown = () => (
    <Svg style={{ marginRight: -6 }}>
        <path
            d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </Svg>
);

