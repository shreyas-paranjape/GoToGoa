package com.goaamigo.travel.module.common.controller;

import android.app.Fragment;

import com.goaamigo.travel.module.common.model.Item;
import com.goaamigo.travel.module.common.model.ItemGroup;
import com.goaamigo.travel.module.trip.view.app.ItineraryFragment;

import java.util.ArrayList;
import java.util.List;

public class GoaAmigoDrawerController implements DrawerController {

    private final List<ItemGroup> drawerItemGroups;

    public GoaAmigoDrawerController() {
        drawerItemGroups = new ArrayList<>();
        prepareListData();
    }

    @Override
    public Fragment getFragment(int group, int child) {
        return drawerItemGroups.get(group)
                .getItems().get(child)
                .getDisplayFragment();
    }

    @Override
    public List<ItemGroup> getDrawerItemGroups() {
        return drawerItemGroups;
    }

    private void prepareListData() {

        ItemGroup home = new ItemGroup("Home");
        home.getItems().add(new Item("Trip") {
            @Override
            public Fragment getDisplayFragment() {
                return new ItineraryFragment();
            }
        });

        drawerItemGroups.add(home);
    }
}
