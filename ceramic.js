/// Ceramic
import { TileDocument } from '@ceramicnetwork/stream-tile'

import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import KeyDidResolver from 'key-did-resolver'
import { createNftDidUrl, getResolver as nftResolver } from 'nft-did-resolver'

import { fromString } from "uint8arrays";
import { randomBytes } from "crypto";
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'


const run = async () => {

    const ceramic = new CeramicClient("https://ceramic-dev.3boxlabs.com")

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

    const didNFT = createNftDidUrl({
        chainId: 'eip155:1',
        namespace: 'erc721',
        contract: '0x138ded8d927e66ddb3a417cafa9baee958162547',
        tokenId: '2',
    })


    const resolver = {
        ...KeyDidResolver.getResolver(),
        ...get3IDResolver(ceramic),
        ...nftResolver(config)
    }

    const seed = new Uint8Array(randomBytes(32));
    const provider = new Ed25519Provider(seed)
    const did = new DID({ provider, resolver: resolver })


    ceramic.did = did;

    await did.authenticate();


    const didNFT2 =
        "did:nft:eip155:4_erc721:0xe2a6a2da2408e1c944c045162852ef2056e235ab_1";

    await new Promise(r => setTimeout(r, 2000));

    const tile = await TileDocument.create(ceramic, { foo: "blah" }, { controllers: [didNFT2] })

}

run();