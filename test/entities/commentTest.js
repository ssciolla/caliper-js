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
var Comment = require('../../src/entities/survey/comment');
var Person = require('../../src/entities/agent/person');
var CourseSection = require('../../src/entities/agent/courseSection');
var DigitalResource = require('../../src/entities/resource/digitalResource');
var DigitalResourceCollection = require('../../src/entities/resource/digitalResourceCollection');
var clientUtils = require('../../src/clients/clientUtils');
var testUtils = require('../testUtils');

var path = config.testFixturesBaseDir.v1p1 + "caliperEntityComment.json";

testUtils.readFile(path, function(err, fixture) {
  if (err) throw err;
  
  test('commentTest', function (t) {
    
    // Plan for N assertions
    t.plan(1);
    
    var BASE_IRI = "https://example.edu";
    var BASE_SECTION_IRI = "https://example.edu/terms/201801/courses/7/sections/1";
    
    var person = entityFactory().create(Person, {id: BASE_IRI.concat("/users/554433")});
    var section = entityFactory().create(CourseSection, {id: BASE_SECTION_IRI});
    var collection = entityFactory().create(DigitalResourceCollection, {
      id: BASE_SECTION_IRI.concat("/resources/1"),
      name: "Course Assets",
      isPartOf: section
    });
    var resource = entityFactory().create(DigitalResource, {
      id: BASE_SECTION_IRI.concat("/resources/1/syllabus.pdf"),
      name: "Course Syllabus",
      mediaType: "application/pdf",
      isPartOf: collection,
      dateCreated: moment.utc("2018-08-02T11:32:00.000Z")
    });
    
    var entity = entityFactory().create(Comment, {
      id: BASE_SECTION_IRI.concat("/assess/1/items/6/users/665544/responses/1/comment/1"),
      commenter: person,
      commentedOn: resource,
      value: "I like what you did here but you need to improve on...",
      dateCreated: moment.utc("2018-08-01T06:00:00.000Z")
    });
    
    // Compare
    var diff = testUtils.compare(fixture, clientUtils.parse(entity));
    var diffMsg = "Validate JSON" + (!_.isUndefined(diff) ? " diff = " + clientUtils.stringify(diff) : "");
    
    t.equal(true, _.isUndefined(diff), diffMsg);
    //t.end();
  });
});