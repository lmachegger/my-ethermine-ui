export async function fetchData() {
    const yearRes = await fetch(
        "https://ethermine-api.herokuapp.com/stats/allStats?interval=YEAR"
    );
    const yearStats = await yearRes.json();

    const monthRes = await fetch(
        "https://ethermine-api.herokuapp.com/stats/allStats?interval=MONTH"
    );
    const monthStats = await monthRes.json();

    const weekRes = await fetch(
        "https://ethermine-api.herokuapp.com/stats/allStats?interval=WEEK"
    );
    const weekStats = await weekRes.json();

    const dayRes = await fetch(
        "https://ethermine-api.herokuapp.com/stats/allStats?interval=DAY"
    );
    const dayStats = await dayRes.json();

    // get ALL
    const allRes = await fetch(
        "https://ethermine-api.herokuapp.com/alltimestats"
    );
    const allStats = await allRes.json();

    const balanceRes = await fetch('https://mainnet.infura.io/v3/e0adfa296971448280b404facf6c497e', {
        method: 'POST',
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": 0,
            "method": "eth_getBalance",
            "params": [
                "0x9af9008cc4B5ed2A245c4F0eA042B5396bEf13e0",
                "latest"
            ],
        })
    });
    const balance = await balanceRes.json();
    const ethVal = parseInt(balance.result, 16) / 1000000000000000000;

    const unpaidRes = await fetch(
        'https://api.ethermine.org/miner/9af9008cc4B5ed2A245c4F0eA042B5396bEf13e0/currentStats'
    );
    const unpaid = await unpaidRes.json();
    const unpaidEth = unpaid.data.unpaid / 1000000000000000000;

    const result = {
        Yearly: yearStats,
        Monthly: monthStats,
        Weekly: weekStats,
        Daily: dayStats,
        All: allStats,
        Balance: ethVal + unpaidEth
    };
    console.log(result);
    return result;
}