export function statsToChartData(stats) {
    const coins = [
        {
            name: "ETH",
            prop: "coinsPerHour",
        },
        {
            name: "BTC",
            prop: "btcPerHour",
        },
    ];

    const usd = [
        {
            name: "USD",
            prop: "usdPerHour",
        },
    ];

    const hashrates = [
        {
            name: "reported",
            prop: "reportedHashrate",
        },
        {
            name: "actual",
            prop: "currentHashrate",
        },
    ];

    return {
        coinData: getChartData(coins, stats),
        usdData: getChartData(usd, stats),
        hashrateData: getChartData(hashrates, stats),
    };
}

export function getChartData(objects, data) {
    return objects.map((d) => ({
        name: d.name,
        data: data.map((i) => [i.time * 1000, i[d.prop]]),
        marker: {
            enabled: false,
        },
        animation: {
            duration: 600,
        },
    }));
}

export function getMaxStats(filterStats) {
    // calc max of all stats
    const arr = [
        filterStats.All,
        filterStats.Yearly,
        filterStats.Monthly,
        filterStats.Weekly,
        filterStats.Daily,
    ];

    const reportedHashrate = Math.max(
        ...arr.map((o) => o.maxStats?.reportedHashrate),
        0
    );

    const currentHashrate = Math.max(
        ...arr.map((o) => o.maxStats?.currentHashrate),
        0
    );

    const validShares = Math.max(...arr.map((o) => o.maxStats?.validShares), 0);

    const coinsPerHour = Math.max(...arr.map((o) => o.maxStats?.coinsPerHour), 0);

    const btcPerHour = Math.max(...arr.map((o) => o.maxStats?.btcPerHour), 0);

    const usdPerHour = Math.max(...arr.map((o) => o.maxStats?.usdPerHour), 0);

    return {
        reportedHashrate: reportedHashrate,
        currentHashrate: currentHashrate,
        validShares: validShares,
        coinsPerHour: coinsPerHour,
        btcPerHour: btcPerHour,
        usdPerHour: usdPerHour,
    };
}