const testing = true;

function getBaseUrl() {
    if (testing) {
        return 'http://localhost:8080/InternshipOfferProject';
    } else {
        return 'https://interntest.drophere.xyz/api';
    }
}