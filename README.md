# Raffler

Raffler is an algorithm to select a winner from a provably fair source of randomness.

# The Algorithm

The algorithm is as follows:

- Prior to starting, create an ordered list of participants (`L_0`)
- Select some random string `S_0` from an unbiased source of randomness
- For each prize `n`, (n = 1, 2, ..., N):
  - Calculate `H_n = HMAC_SHA256(S_0, string(n))`
  - Interpret H_n as a integer `Z_n`
  - The winner is `Z_n mod length(L_(n-1))`
  - Remove the winner from the list to get `L_n`

Some things to point out:

- There are no special requirements for the list. The order doesn't matter. You could use the names of the participants in some lexicographical order agreed upon beforehand, for example
- A good source of randomness could be the hash of the first blockchain block generated after the submission deadline