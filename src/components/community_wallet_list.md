This component will show a table
The table should be sortable.
The tables columns include:

1. string, address of community wallet
2. bool, if it is authorized for v8
3. bool, if a reauthorization vote is underway
4. float, number of coins on balance

Sources, for each data point.
The source for the data will use the open-libra-sdk to call "view functions". The handlers for those requests should exist in a separate utility file.

#1:
The list of all accounts can be found by calling the API with the view function:
`0x1::donor_voice::get_root_registry` (no arguments needed).

#2
Whether or not the community wallet is authorized for v8 can be found at
`0x1::reauthorization::is_v8_authorized` with one argument: of the community wallet address

#3
`0x1::donor_voice_governance::is_reauth_proposed` with one argument: of the community wallet address

#4
THe balance can be found with
`0x1::ol_account::balance`, with one argument: the community wallet address. The return of this function is an array of two numbers, the first being the unlocked balance (which does not apply to a community wallet), and the total balance.
