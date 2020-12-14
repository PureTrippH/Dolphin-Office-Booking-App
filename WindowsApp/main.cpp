#include <iostream>
using namespace std;

string input();
struct res;

int main() {
    
    string res = input();

    for(int i = 0 ; i<=res ; i++) {

    }

    while(true) {
        
    }
    return 0;
}

string input() {
    cout << "What Number Do You Want to Count By? (Enter 'Q' To Quit)" << endl;
    string ans;
    cin >> ans;
    return ans;
}


struct res {
    string res;
    string amount;
};


