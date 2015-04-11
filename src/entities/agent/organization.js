/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Agent = require('../foaf/agent');
var EntityType = require('../entityType');

/**
 * Represents Organization.  
 * Organization's prototype set to Agent
 * @constructor
 * @param {string} id URI
 * @property {Object} parentOrg Parent Organization Object
 * @extends Agent
 */
function Organization(id) {

  Agent.call(this);

  this.setId(id);
  this.setType(EntityType.type.ORGANIZATION);
  // this.setName(null);
}

Organization.prototype = _.create(Agent.prototype);

Organization.prototype.setParentOrg = function(parentOrg) {
  this.parentOrg = parentOrg;
};

module.exports = Organization;
