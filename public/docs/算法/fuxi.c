#include <stdio.h>

bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

bool isPowerOfThree(int n) {
    return n > 0 && (1162261467 % n) == 0;
}

bool isPowerOfThree(int n) {
    return n > 0 && (n & (n - 1)) == 0 && ( 0xaaaaaaaa & n) == 0;
}

int nthFactor(int n, int k) {
    int count = 0;
    int factor;
    for (factor = 1; factor * factor <= n; factor ++) {
    	if (n % factor) {
	    count ++;
	    if (count == k) return factor;
	}
    }
    factor --;

    if (factor * factor == n) {
    	factor --;
    }
    for (;factor > 0; factor --) {
   	if (n % factor) {
	    count ++;
	    if (count == k) return n / factor;
	} 
    }
    return -1;
}

bool isPerfectSquare(int n) {
	int left=1, right = n;
	int mid, value;	
	for (;left<=right;) {
		mid = left + (right - left) / 2;
		value = mid * mid;
		if (value > n) {
			right = mid - 1;
		} else if (value < n) {
			left = mid + 1;
		} else {
			return true;
		}
	}
	return false;

}

int sumNums(int n) {
	return n > 0 ? n + sumNums(n -1) : 0;
}

int quickMulti(int A, int B) {
	int vlaue = 0;
	for (; B; B >>= 1) {
		if (B & 1) {
			value += A;
		}
		value <<= 1
	}
}

