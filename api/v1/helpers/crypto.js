const base64 = require('base-64');

function password_hash(inputString) {
    const rotateLeft = (value, shift) => (value << shift) | (value >>> (32 - shift));

    const words = [];
    let byteArray = [];

    for (let i = 0; i < inputString.length; i++) {
        byteArray.push(inputString.charCodeAt(i));
    }

    const messageLength = byteArray.length * 8;

    byteArray.push(0x80);

    while (byteArray.length % 64 !== 56) {
        byteArray.push(0);
    }

    byteArray = byteArray.concat(new Array(8).fill(0));

    for (let i = 0; i < byteArray.length; i += 4) {
        words.push(
            byteArray[i] |
            (byteArray[i + 1] << 8) |
            (byteArray[i + 2] << 16) |
            (byteArray[i + 3] << 24)
        );
    }

    var h0 = 0x67452301;
    var h1 = 0xefcdab89;
    var h2 = 0x98badcfe;
    var h3 = 0x10325476;

    for (let i = 0; i < words.length; i += 16) {
        const w = new Array(16);
        for (let j = 0; j < 16; j++) {
            w[j] = words[i + j];
        }

        let a = h0;
        let b = h1;
        let c = h2;
        let d = h3;

        for (let j = 0; j < 64; j++) {
            let f, g;

            if (j < 16) {
                f = (b & c) | (~b & d);
                g = j;
            } else if (j < 32) {
                f = (d & b) | (~d & c);
                g = (5 * j + 1) % 16;
            } else if (j < 48) {
                f = b ^ c ^ d;
                g = (3 * j + 5) % 16;
            } else {
                f = c ^ (b | ~d);
                g = (7 * j) % 16;
            }

            const temp = d;
            d = c;
            c = b;
            b = b + rotateLeft((a + f + 0x5a827999 + w[g]) | 0, 2);
            a = temp;
        }

        h0 = (h0 + a) | 0;
        h1 = (h1 + b) | 0;
        h2 = (h2 + c) | 0;
        h3 = (h3 + d) | 0;
    }

    const toHexString = (value) => {
        let hex = value.toString(16);
        while (hex.length < 8) {
            hex = '0' + hex;
        }
        return hex;
    };

    return toHexString(h0) + toHexString(h1) + toHexString(h2) + toHexString(h3);
}

function encode(uid, type, status) {
    const inputString = `${uid}:${type}:${status}`;

    const encodedString = base64.encode(inputString);

    return encodedString;
}

function decode(encodedString) {
    const decodedString = base64.decode(encodedString);

    // Tách chuỗi thành uid, type và status
    const [uid, type, status] = decodedString.split(':');

    return { uid, type, status };
}

module.exports = { encode, decode, password_hash };