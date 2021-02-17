import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    let underTest: GildedRose;

    beforeEach('setup', () => {
        underTest = new GildedRose()
    });

    describe('constructor', () => {
        const items = [ new Item('foo', 1, 2) ]
        const sut = new GildedRose(items);
        expect(sut.items).to.equal(items);
    });

    describe('updateQuality', () => {
        describe('custom name', () => {
            it('should decrease the quality by 1 when sellIn > 0 and name is not special', () => {
                underTest.items = [ new Item('foo', 1, 2) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(1);
            });
        
            it('should decrease the quality by 2 when sellIn <= 0 and name is not special', () => {
                underTest.items = [ new Item('foo', 0, 3) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(1);
            });
    
            it('should not decrease the quality by 2 when quality 0 and name is not special', () => {
                underTest.items = [ new Item('foo', 0, 0) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(0);
            });

            it('should decrease the sellIn by 1 when name is not Sulfuras, Hand of Ragnaros', () => {
                underTest.items = [ new Item('foo', 5, 3) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].sellIn).to.equal(4);
            });
        });

        describe('Aged Brie', () => {
            it('should increase the quality by 1 when quality is 49 and name Aged Brie', () => {
                underTest.items = [ new Item('Aged Brie', 0, 49) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(50);
            });
    
            it('should increase the quality by 2 when quality is less than 49 and sell by date is less than 1 and name Aged Brie', () => {
                underTest.items = [ new Item('Aged Brie', 0, 47) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(49);
            });

            it('should increase the quality by 1 when quality is less than 49 and sell by date is greater than 0 and name Aged Brie', () => {
                underTest.items = [ new Item('Aged Brie', 1, 47) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(48);
            });

            it('should not increase the quality when quality is 50 or greater and name Aged Brie', () => {
                underTest.items = [ new Item('Aged Brie', 0, 50) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(50);
            });

            it('should decrease the sellIn by 1 when name is not Sulfuras, Hand of Ragnaros', () => {
                underTest.items = [ new Item('Aged Brie', 5, 47) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].sellIn).to.equal(4);
            });
        });

        describe('Backstage passes to a TAFKAL80ETC concert', () => {
            it('should increase the quality by 1 when quality is less than 50 and more than 11 days til expired and name Backstage passes...', () => {
                underTest.items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 40, 17) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(18);
            });

            it('should increase the quality by 2 when quality is less than 49 and more than 6 days but less than 11 til expired and name Backstage passes...', () => {
                underTest.items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 7, 17) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(19);
            });

            it('should increase the quality up to 50 when quality is 49 and more than 6 days but less than 11 til expired and name Backstage passes...', () => {
                underTest.items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 7, 49) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(50);
            });

            it('should increase the quality by 3 when quality is less than 48 and less than 6 til expired and name Backstage passes...', () => {
                underTest.items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 4, 17) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(20);
            });

            it('should increase the quality up to 50 when quality is 48 and less than 6 til expired and name Backstage passes...', () => {
                underTest.items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 4, 48) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(50);
            });

            it('should decrease the quality to 0 when quality when expired and name Backstage passes...', () => {
                underTest.items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 17) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(0);
            });

            it('should decrease the sellIn by 1 when name is not Sulfuras, Hand of Ragnaros', () => {
                underTest.items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 47) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].sellIn).to.equal(4);
            });
        });

        describe('Sulfuras, Hand of Ragnaros', () => {
            it('should not descrease the quality when name Sulfuras...', () => {
                underTest.items = [ new Item('Sulfuras, Hand of Ragnaros', 0, 17) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(17);
            });

            it('should not descrease the sellIn when name Sulfuras...', () => {
                underTest.items = [ new Item('Sulfuras, Hand of Ragnaros', 5, 17) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].sellIn).to.equal(5);
            });

            it('should not descrease the quality when name Sulfuras... even when sell by is negative', () => {
                underTest.items = [ new Item('Sulfuras, Hand of Ragnaros', -1, 17) ]
                const updated_items = underTest.updateQuality();
                expect(updated_items[0].quality).to.equal(17);
            });
        });


    });

});
