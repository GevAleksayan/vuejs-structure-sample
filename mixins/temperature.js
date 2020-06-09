export default {
    computed: {
        temperatures() {
            let feverArr = [];
            for (let i = 99.5; i < 104.9; i += 0.1) {
                feverArr.push(parseFloat(i).toFixed(1));
            }
            return feverArr;
        },
        temperatureRequired() {
            return this.$v.temperature.$dirty && !this.$v.temperature.required;
        },
    },
}