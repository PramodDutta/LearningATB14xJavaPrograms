// NOTE: JavaScript Set maintains insertion order (like LinkedHashSet). No TreeSet equivalent.

const hs = new Set(); // hashing mechanism ?
// da67sd7a6sdad68as67da8d67
hs.add("Pramod"); // da67sd7a6sdad68as67da8d67
hs.add("Pramod"); // da67sd7a6sdad68as67da8d67 - duplicate, won't be added
hs.add("dramod"); // wewewa67sd7a668as67da8d67
console.log(hs);

const lhs = new Set(); // LinkedHashSet equivalent
const ts = new Set(); // TreeSet equivalent (would need manual sorting)
