import { ifError } from "assert";

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export enum SPECIAL_ITEMS {
    CHEESE = "Aged Brie",
    TICKETS = "Backstage passes to a TAFKAL80ETC concert",
    BOOK = "Sulfuras, Hand of Ragnaros"
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach(item => {
            if (item.name == SPECIAL_ITEMS.BOOK) return;

            item.sellIn--

            this.updateTicketQuality(item)
            this.updateCheeseQuality(item)
            this.updateOthersQuality(item)

            if (item.quality < 0) item.quality = 0
            if (item.quality > 50) item.quality = 50
        })
        return this.items
    }

    private updateOthersQuality(item: Item) {
        if (item.name == SPECIAL_ITEMS.CHEESE || item.name == SPECIAL_ITEMS.TICKETS) return
        item.quality--
        if (item.sellIn < 0) {
            item.quality--
        }
    }

    private updateCheeseQuality(item: Item) {
        if (item.name != SPECIAL_ITEMS.CHEESE) return
        item.quality++
        if (item.sellIn < 0) {
            item.quality++
        }
    }

    private updateTicketQuality(item: Item) {
        if (item.name != SPECIAL_ITEMS.TICKETS) return
        item.quality++
        if (item.sellIn < 0)  {
            item.quality = 0
        } else if (item.sellIn < 6) {
            item.quality += 2
        } else if (item.sellIn < 11) {
            item.quality++
        }
    }
}
