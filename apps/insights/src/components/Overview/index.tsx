import { Badge } from "@pythnetwork/component-library/Badge";
import { Button } from "@pythnetwork/component-library/Button";
import { CrossfadeTabPanels } from "@pythnetwork/component-library/CrossfadeTabPanels";
import { Tabs } from "@pythnetwork/component-library/unstyled/Tabs";

import styles from "./index.module.scss";
import PriceFeeds from "./price-feeds.svg";
import Publishers from "./publishers.svg";
import { TabList } from "./tab-list";
import {
  totalVolumeTraded,
  activeChains,
  activePublishers,
  activeFeeds,
} from "../../static-data/stats";
import { ChangePercent } from "../ChangePercent";
import { ChartCard } from "../ChartCard";
import { FormattedDate } from "../FormattedDate";
import { FormattedNumber } from "../FormattedNumber";

export const Overview = () => (
  <div className={styles.overview}>
    <h1 className={styles.header}>Overview</h1>
    <section className={styles.stats}>
      <ChartCard
        header="Total Volume Traded"
        variant="primary"
        data={totalVolumeTraded.map(({ date, volume }) => ({
          x: date,
          displayX: <FormattedDate value={date} />,
          y: volume,
          displayY: (
            <FormattedNumber
              value={volume}
              currency="usd"
              style="currency"
              notation="compact"
            />
          ),
        }))}
        miniStat={
          <ChangePercent
            previousValue={totalVolumeTraded.at(-2)?.volume ?? 0}
            currentValue={totalVolumeTraded.at(-1)?.volume ?? 0}
          />
        }
        stat={
          <FormattedNumber
            value={totalVolumeTraded.at(-1)?.volume ?? 0}
            currency="usd"
            style="currency"
            notation="compact"
          />
        }
      />
      <ChartCard
        header="Publishers Onboarded"
        href="/publishers"
        chartClassName={styles.publishersChart}
        data={activePublishers.map(({ date, numPublishers }) => ({
          x: date,
          displayX: <FormattedDate value={date} />,
          y: numPublishers,
        }))}
        miniStat={
          <ChangePercent
            previousValue={activePublishers.at(-2)?.numPublishers ?? 0}
            currentValue={activePublishers.at(-1)?.numPublishers ?? 0}
          />
        }
        stat={activePublishers.at(-1)?.numPublishers}
      />
      <ChartCard
        header="Price Feeds (Active + Coming Soon)"
        href="/price-feeds"
        chartClassName={styles.priceFeedsChart}
        data={activeFeeds.map(({ date, numFeeds }) => ({
          x: date,
          displayX: <FormattedDate value={date} />,
          y: numFeeds,
        }))}
        miniStat={
          <ChangePercent
            previousValue={activeFeeds.at(-2)?.numFeeds ?? 0}
            currentValue={activeFeeds.at(-1)?.numFeeds ?? 0}
          />
        }
        stat={activeFeeds.at(-1)?.numFeeds}
      />
      <ChartCard
        header="Active Chains"
        data={activeChains.map(({ date, chains }) => ({
          x: date,
          displayX: <FormattedDate value={date} />,
          y: chains,
        }))}
        miniStat={
          <ChangePercent
            previousValue={activeChains.at(-2)?.chains ?? 0}
            currentValue={activeChains.at(-1)?.chains ?? 0}
          />
        }
        stat={activeChains.at(-1)?.chains}
      />
    </section>
    <Tabs orientation="vertical" className={styles.overviewMainContent ?? ""}>
      <section>
        <Badge>INSIGHTS</Badge>
        <p className={styles.headline}>Get the most from the Pyth Network</p>
        <p className={styles.message}>
          Insights Hub delivers transparency over the network status and
          performance, and maximize productivity while integrating.
        </p>
        <TabList
          label="test"
          className={styles.tabList ?? ""}
          items={[
            {
              id: "publishers",
              header: "Publishers",
              body: "Get insights about quality, ranking, and performance of each Publisher contributing to the network.",
            },
            {
              id: "price feeds",
              header: "Price Feeds",
              body: "See information about every price feed's price, performance, components, and technical aspects all in one place for a better integration experience.",
            },
          ]}
        />
        <div className={styles.buttons}>
          <Button href="/publishers" variant="solid" size="md">
            Publishers
          </Button>
          <Button href="/price-feeds" variant="outline" size="md">
            Price Feeds
          </Button>
        </div>
      </section>
      <CrossfadeTabPanels
        items={[
          { id: "publishers", children: <Publishers /> },
          { id: "price feeds", children: <PriceFeeds /> },
        ]}
      />
    </Tabs>
  </div>
);
