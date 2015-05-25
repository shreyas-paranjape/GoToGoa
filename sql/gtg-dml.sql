-- use the "gtg" database
use gtg;
-- Insert a new organization record
insert into phy_add(pincode) values ('000000');
insert into comm(comm_email) values('a@b.com');
insert into party(party_comm_id,party_phy_add_id) 
	values ((select max(comm_id) from comm), (select max(phy_add_id) from phy_add));
insert into organization values ((select max(party_id) from party),'a');

-- select all parties
select * from party;

-- select all physical addresses
select * from phy_add;

-- select all comm details
select * from comm;

-- select all organization details
select * from organization 
	inner join party on organization.org_id = party.party_id
	inner join comm on comm.comm_id = party.party_id
	inner join phy_add on phy_add.phy_add_id = party.party_phy_add_id;

-- insert a facility
insert into facility(fac_name,fac_org_id,fac_comm_id,fac_phy_add) 
	values('hotel 1',
		(select max(org_id) from organization),
		(select max(comm_id) from comm), 
		(select max(phy_add_id) from phy_add));


-- select all facilities
select * from facility 
	inner join comm on comm.comm_id = facility.fac_comm_id
	inner join phy_add on phy_add.phy_add_id = facility.fac_phy_add;

-- insert a hotel
insert into hotel(hotel_id,hotel_description)
	values((select max(fac_id) from facility),'some text descibing how awesome the hotel is');

