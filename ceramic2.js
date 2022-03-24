import { getResolver } from 'nft-did-resolver'
import { Resolver } from 'did-resolver'
import { CeramicClient } from '@ceramicnetwork/http-client'

const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com")// connects to localhost:7007 by default

const config = {
    ceramic,
    chains: {
        'eip155:1': {
            blocks: 'https://api.thegraph.com/subgraphs/name/yyong1010/ethereumblocks',
            skew: 15000,
            assets: {
                erc721: 'https://api.thegraph.com/subgraphs/name/sunguru98/mainnet-erc721-subgraph',
                erc1155: 'https://api.thegraph.com/subgraphs/name/sunguru98/mainnet-erc1155-subgraph',
            },
        },
        'eip155:4': {
            blocks: 'https://api.thegraph.com/subgraphs/name/mul53/rinkeby-blocks',
            skew: 15000,
            assets: {
                erc721: 'https://api.thegraph.com/subgraphs/name/sunguru98/erc721-rinkeby-subgraph',
                erc1155: 'https://api.thegraph.com/subgraphs/name/sunguru98/erc1155-rinkeby-subgraph',
            },
        },
    },
}

// getResolver will return an object with a key/value pair of { 'nft': resolver }
// where resolver is a function used by the generic did resolver.
const nftResolver = getResolver(config)
const didResolver = new Resolver(nftResolver)

const erc721result = await didResolver.resolve(
    'did:nft:eip155:1_erc721:0xb300a43751601bd54ffee7de35929537b28e1488_2'
)
const erc1155result = await didResolver.resolve(
    'did:nft:eip155:1_erc1155:0x06eb48572a2ef9a3b230d69ca731330793b65bdc_1'
)
console.log(erc721result, erc1155result)