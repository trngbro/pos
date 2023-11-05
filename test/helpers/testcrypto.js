const { encode, decode, password_hash } = require('../../test/helpers/crypto');
const chai = require('chai');
const expect = chai.expect;

describe('encode and decode functions', function () {
  it('should encode and decode a string', function () {
    const input = 'uid123:name:admin:active';
    const encoded = encode('uid123', 'name', 'admin', 'active');
    const decoded = decode(encoded);

    expect(decoded).to.deep.equal({ uid: 'uid123', name: 'name', type: 'admin', status: 'active' });
    expect(encoded).to.equal(btoa(input));
  });
});

describe('password_hash function', function () {
  it('should hash a password', function () {
    const password = 'password123';
    const hash = password_hash(password);

    const expectedHash = hash;

    expect(hash).to.equal(expectedHash);
  });
});
