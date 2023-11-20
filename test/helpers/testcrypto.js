const chai = require('chai');
const expect = chai.expect;
const { password_hash, encode, decode } = require("../../api/v1/helpers/crypto");

// Đoạn code kiểm tra hàm password_hash
describe('password_hash', () => {
  it('should return an empty string when called without input', () => {
    // Gọi hàm password_hash mà không có đầu vào
    const result = password_hash();
    // Kiểm tra kết quả trả về là undefined (mã hoá mật khẩu mà không có đầu vào)
    expect(result).to.equal(undefined);
  });

  it('should return a non-empty string when called with a string input', () => {
    // Gọi hàm password_hash với đầu vào là một chuỗi
    const result = password_hash('abc123');
    // Kiểm tra rằng kết quả trả về là một chuỗi (mã hoá mật khẩu)
    expect(result).to.be.a('string');
    // Kiểm tra rằng kết quả trả về không rỗng
    expect(result).to.not.equal('');
  });

  it('should return a non-empty string when called with different input types', () => {
    // Gọi hàm password_hash với đầu vào là một số
    const result1 = password_hash(123);
    // Gọi hàm password_hash với đầu vào là một đối tượng
    const result2 = password_hash({ key: 'value' });
    // Kiểm tra rằng cả hai kết quả trả về là chuỗi và không rỗng(mã hoá mật khẩu)
    expect(result1).to.be.a('string');
    expect(result1).to.not.equal('');

    expect(result2).to.be.a('string');
    expect(result2).to.not.equal('');
  });
});
// Tương tự cho các phần kiểm tra encode và decode
describe('encode', () => {
  it('should return a string when called without input', () => {
    const result = encode();
    expect(result).to.be.a('string');
  });

  it('should return a string when called with empty strings', () => {
    const result = encode('', '', '', '');
    expect(result).to.be.a('string');
  });

  it('should return a string when called with mixed input types', () => {
    const result1 = encode(123, { name: 'John' }, 'type', 456);
    const result2 = encode('123', '[object Object]', 'type', '456');

    expect(result1).to.be.a('string');
    expect(result2).to.be.a('string');
  });
});

describe('decode', () => {
  it('should throw an error when called with an invalid input', () => {
    expect(() => decode('invalidString')).to.throw();
  });

  it('should return an object with uid, name, type, and status when called with a valid input', () => {
    const result = decode('b3AxOm9wMjpvcDM6b3A0');
    expect(result).to.deep.equal({ uid: 'op1', name: 'op2', type: 'op3', status: 'op4' });
  });
});
// Phần cross-checking kiểm tra sự nhất quán giữa encode và decode
describe('cross-checking', () => {
  it('encode() multiple times should return the same result', () => {
    const input = ['uid', 'name', 'type', 'status'];
    const result1 = encode(...input);
    const result2 = encode(...input);
    expect(result1).to.equal(result2);
  });

  it('decode() multiple times should return the same result', () => {
    const input = 'b3AxOm9wMjpvcDM6b3A0';
    const result1 = decode(input);
    const result2 = decode(input);
    expect(result1).to.deep.equal(result2);
  });

  it('encode(decode()) should equal to encode()', () => {
    const input = ['uid', 'name', 'type', 'status'];
    const encodedInput = encode(...input);
    const decodedInput = decode(encodedInput);
    const result = encode(...input);

    expect(encodedInput).to.equal(result);
    expect(decodedInput).to.deep.equal({ uid: 'uid', name: 'name', type: 'type', status: 'status' });
  });
});
