// NOTE: JavaScript Map maintains insertion order (like LinkedHashMap).
// NOTE: Java Hashtable is synchronized (thread-safe) and does not allow null keys or values.
// JS is single-threaded, so regular Map suffices.

// Map - K, V, null values allows
// Hashtable - Synchronised, Slow and Legacy Class - Thread Safe
// T1, T2 - they will use one by one.

const ht1 = new Map();
ht1.set(1, "one");
ht1.set(2, "two");
ht1.set(3, "three");
// ht1.set(4, null); // In Java Hashtable: java.lang.NullPointerException
// ht1.set(null, "three"); // In Java Hashtable: java.lang.NullPointerException
