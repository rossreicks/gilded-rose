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
            if ((<any>Object).values(SPECIAL_ITEMS).includes(item.name)) {
                if (item.name != SPECIAL_ITEMS.BOOK && item.quality < 50) {
                    item.quality++

                    if (item.name == SPECIAL_ITEMS.TICKETS) {
                        if (item.quality < 50 && item.sellIn < 11) {
                            item.quality++
                        }
                        if (item.quality < 50 && item.sellIn < 6) {
                            item.quality++
                        }
                    } 
                }
            } 
            else {
                if (item.name != SPECIAL_ITEMS.BOOK && item.quality > 0) {
                    item.quality--
                }
            }

            if (item.name != SPECIAL_ITEMS.BOOK) {
                item.sellIn--
            }

            if (item.sellIn < 0) {
                if (item.name == SPECIAL_ITEMS.CHEESE) {
                    if (item.quality < 50) {
                        item.quality++
                    }
                }
                else if (item.name == SPECIAL_ITEMS.TICKETS) {
                    item.quality = 0
                }
                else if (item.name != SPECIAL_ITEMS.BOOK && item.quality > 0) {
                    item.quality--
                }
            }
        })

        return this.items;
    }
}
