import React from "react";
import Witnesses from "./Witnesses";
import CommitteeMembers from "./CommitteeMembers";
import FeesContainer from "../Blockchain/FeesContainer";
import BlocksContainer from "./BlocksContainer";
import AssetsContainer from "./AssetsContainer";
import AccountsContainer from "./AccountsContainer";
import counterpart from "counterpart";
import MarketsContainer from "../Exchange/MarketsContainer";
import {Tabs} from "bitshares-ui-style-guide";

import config from "../../config/default.json";

class Explorer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: [
                {
                    name: "blocks",
                    link: "/explorer/blocks",
                    translate: "explorer.blocks.title",
                    content: BlocksContainer
                },
                {
                    name: "assets",
                    link: "/explorer/assets",
                    translate: "explorer.assets.title",
                    content: AssetsContainer
                },
                {
                    name: "accounts",
                    link: "/explorer/accounts",
                    translate: "explorer.accounts.title",
                    content: AccountsContainer
                },
                {
                    name: "witnesses",
                    link: "/explorer/witnesses",
                    translate: "explorer.witnesses.title",
                    content: Witnesses
                },
                {
                    name: "committee_members",
                    link: "/explorer/committee-members",
                    translate: "explorer.committee_members.title",
                    content: CommitteeMembers
                },
                config.ui.display_market
                    ? tabs.push({
                          name: "markets",
                          link: "/explorer/markets",
                          translate: "markets.title",
                          content: MarketsContainer
                      })
                    : null,
                {
                    name: "fees",
                    link: "/explorer/fees",
                    translate: "fees.title",
                    content: FeesContainer
                }
            ]
        };
    }

    render() {
        const onChange = value => {
            this.props.history.push(value);
        };
        return (
            <Tabs
                activeKey={this.props.location.pathname}
                animated={false}
                style={{display: "table", height: "100%", width: "100%"}}
                onChange={onChange}
            >
                {this.state.tabs.map(tab => {
                    if (!tab) return;
                    const TabContent = tab.content;

                    return (
                        <Tabs.TabPane
                            key={tab.link}
                            tab={counterpart.translate(tab.translate)}
                        >
                            <div className="padding">
                                <TabContent />
                            </div>
                        </Tabs.TabPane>
                    );
                })}
            </Tabs>
        );
    }
}

export default Explorer;
