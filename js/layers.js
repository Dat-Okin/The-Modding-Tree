addLayer("shards", {
    name: "Mana Shards", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    resetDescription: "Condense ",
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0F42BA",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Mana Shards", // Name of prestige currency
    baseResource: "mana", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: To condense mana into Shards", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() { return true },

    buyables: {


        11: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)) },
            effect(x) { return new Decimal(1).add(x || getBuyableAmount(this.layer, this.id)) },
            title: "Mana Boost",
            display() {
                return "Shards are boosting mana by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\ Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Shards"
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                let base = new Decimal(1)
                let growth = 1.1
                let max = Decimal.affordGeometricSeries(player[this.layer].points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
            },
           
        },

    },

})