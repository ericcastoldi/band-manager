/* global describe, before, it, after */
var expect = require('chai')
  .expect;
var sinon = require('sinon');
var mock = require('mock-require');

var axiosSpy = sinon.spy();
mock('axios', axiosSpy);

var songFactorySpy = sinon.spy();
mock('../../../src/api/model/songFactory', songFactorySpy);

var actions = require('../../../src/components/state/actions.js');
describe('actions', function () {


  describe('newSong', function () {

    it('the action type should be NEW_SONG', function () {
      expect(actions.newSong.type)
        .to.equal('NEW_SONG');
    });

  });

  after(function () {
    mock.stop('axios');
    mock.stop('../../../src/api/model/songFactory');
  });
});
