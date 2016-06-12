/// @title Meta Contract of PodPort
/// @author Reto Trinkler <rt@hedge-suisse.com>

contract Admin {

    /*
     *  VARIABLES
     */
    address public owner = msg.sender;
    address[] public versions;

    /*
     *  EVENTS
     */
    event VersionUpdated(address indexed _fundAddress, uint indexed _id);

    /*
     *  METHODS
     */
    function Admin() {}
    function () { throw; }

    /*
     *  METHODS - VERSION
     */
    function numVersions() constant returns (uint) { return versions.length; }

    function existsVersion(address _addr) constant returns (bool _exists) {
        for (uint v = 0; v < versions.length; ++v) {
            if (versions[v] == _addr)
                _exists = true;
        }
    }

    /// Assert voting mechanism
    function updateVersion(address _addr) returns (bool) {
        if (owner != msg.sender)
            throw;

        // Registrar Version
        versions.push(_addr);
        VersionUpdated(_addr, versions.length);
        return true;
    }
}
