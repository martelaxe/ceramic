import { createNftDidUrl, getResolver } from 'nft-did-resolver'
import { Resolver } from 'did-resolver'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { fromString } from "uint8arrays";
import { DID } from 'dids'
/// Ceramic
import { TileDocument } from '@ceramicnetwork/stream-tile'

const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com")// connects to localhost:7007 by default

// "did:nft:eip155:4_erc721:0xe2a6a2da2408e1c944c045162852ef2056e235ab_1"
const didNFT = createNftDidUrl({
    chainId: 'eip155:1',
    namespace: 'erc721',
    contract: '0x1234567891234567891234567891234596351156',
    tokenId: '1',
})
const tile = await TileDocument.create(ceramic, { foo: "blah" }, { controllers: [didNFT] })
