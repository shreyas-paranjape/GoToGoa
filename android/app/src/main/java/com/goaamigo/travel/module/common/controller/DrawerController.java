package com.goaamigo.travel.module.common.controller;


import android.app.Fragment;

import com.goaamigo.travel.module.common.model.ItemGroup;

import java.util.List;


public interface DrawerController {

    List<ItemGroup> getDrawerItemGroups();

    Fragment getFragment(int group, int child);
}
