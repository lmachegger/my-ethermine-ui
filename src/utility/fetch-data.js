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

    return {
        Yearly: yearStats,
        Monthly: monthStats,
        Weekly: weekStats,
        Daily: dayStats,
        All: allStats,
    };
}