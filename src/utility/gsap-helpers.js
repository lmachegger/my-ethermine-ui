import gsap from "gsap";

export function gsapAddPrecisePlugin() {
    gsap.registerPlugin({
        name: "precise",
        init(target, vars, tween, index, targets) {
            let data = this,
                p,
                value;
            data.t = target;
            const max = 7;
            let counter = 0;
            for (p in vars) {
                if (counter >= max) break;
                value = vars[p];
                typeof value === "function" &&
                    (value = value.call(tween, index, target, targets));
                data.pt = { n: data.pt, p: p, s: target[p], c: value - target[p] };
                data._props.push(p);
                counter++;
            }
        },
        render(ratio, data) {
            let pt = data.pt;
            while (pt) {
                data.t[pt.p] = pt.s + pt.c * ratio;
                pt = pt.n;
            }
        },
    });
}