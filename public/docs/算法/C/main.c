#include <stdio.h>

int nthFactor(int n, int k);

int main() {
    
    printf("test\n");
    int a = nthFactor(20, 2);
    printf("因子为：%d\n",a);
    return 0;
}

int nthFactor(int n, int k){
    int i;
    int count = 0;
    for (i=1; i<=n; i++) {
        if (n%i == 0) {
            count ++;
            if (k == count) {
                return i;
            }
        }
    }
    return -1;
}
