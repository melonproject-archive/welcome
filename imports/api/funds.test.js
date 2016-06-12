/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Funds } from './funds.js';

if (Meteor.isServer) {
    describe('Funds', () => {
        describe('methods', () => {
            const userId = Random.id();
            let fundId;

            beforeEach(() => {
                Funds.remove({});
                fundId = Funds.insert({
                    text: 'test fund',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'Joe Plumber',
                });
            });

            it('can delete owned fund', () => {
                // Find the internal implementation of the fund method so we can
                // test it in isolation
                const deleteFund = Meteor.server.method_handlers['funds.remove'];

                // Set up a fake method invocation that looks like what the method expects
                const invocation = { userId };

                // Run the method with `this` set to the fake invocation
                deleteFund.apply(invocation, [fundId]);

                // Verify that the method does what we expected
                assert.equal(Funds.find().count(), 0);
            });
        });
    });
}
