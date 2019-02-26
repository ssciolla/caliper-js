/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

var _ = require('lodash');
var moment = require('moment');
var test = require('tape');

var config =  require('../../src/config/config');
var entityFactory = require('../../src/entities/entityFactory');
var AggregateMeasure = require('../../src/entities/use/aggregateMeasure');
var metric = require('../../src/entities/use/metric');
var clientUtils = require('../../src/clients/clientUtils');
var testUtils = require('../testUtils');

var path = config.testFixturesBaseDir.v1p1 + "caliperEntityAggregateMeasure.json";

testUtils.readFile(path, function(err, fixture) {
    if (err) throw err;

    test('attemptTest', function (t) {

        // Plan for N assertions
        t.plan(1);

        var entity = entityFactory().create(AggregateMeasure, {
            id: "urn:uuid:c3ba4c01-1f17-46e0-85dd-1e366e6ebb81",
            name: "Units Completed",
            metric: metric.unitsCompleted.term,
            metricValue: 12.0,
            metricValueMax: 25.0,
            startedAtTime: moment.utc("2019-08-15T10:15:00.000Z"),
            endedAtTime: moment.utc("2019-11-15T10:15:00.000Z")
        });

        // Compare
        var diff = testUtils.compare(fixture, clientUtils.parse(entity));
        var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + clientUtils.stringify(diff) : "");

        t.equal(true, _.isUndefined(diff), diffMsg);
        //t.end();
    });
});