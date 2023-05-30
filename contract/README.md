*Put artwork on IPFS*
Any relevant artwork, particularly for this sample dapp, the astroninja image needs to be stored in a blockchain compliant manner. The recommendation is to use IPFS for decentralized storage of media files. Media files are large and blockchain (such as Tezos) have a very hefty cost for storage. However, if stored correctly on IPFS, you only need to persist the hash of the media file onto Tezos, which reduces storage fees.

You can do this by following the steps on pinata cloud (www.pinata.cloud). Which makes it very easy to upload files and have them uploaded to IPFS.

https://gateway.pinata.cloud/ipfs/QmZ9sDwKsTrPNZMx85ev4Cnxbr8rZkMnK6XsxZSqsUVhVH?_gl=1*qk6w35*rs_ga*MTg3NDc1ODYwNi4xNjg1NDQ0NTMw*rs_ga_5RMPXG14TE*MTY4NTQ0NDUzMC4xLjEuMTY4NTQ0NDY1Mi4yOC4wLjA.

*Install Ligo*
To deploy a collection on the blockchain you will need an FA2 contract. You can use Ligo for deploying a contract. Ligo is a smart contract language on Tezos. They website contains library of contracts. The one we need is @ligo/fa package.

1. Install Ligo, go to the LIGO website and click on the "Install" tab. It will take you to
https://ligolang.org/docs/intro/installation?lang=jsligo. I used brew to install but the link has many other options.

brew tap ligolang/ligo https://gitlab.com/ligolang/ligo.git
brew install ligolang/ligo/ligo

*Install Ligo/fa package*

1. Now you need to install the @ligo/fa package, You can find the directions on https://packages.ligolang.org/package/@ligo/fa. 

2. To install this package, run 'ligo install ligo-fa'. 

3. It may complain about a missing "esy" installation. You can do that by following the steps at https://esy.sh/docs/en/getting-started.html

*Deploy Contract*
1. In order originate the FA2 contracts from another contract you can use the CREATE_CONTRACT Michelcon instruction like this



LigoLang
- Go 