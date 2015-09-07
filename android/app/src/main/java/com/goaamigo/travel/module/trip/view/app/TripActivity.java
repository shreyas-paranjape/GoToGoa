package com.goaamigo.travel.module.trip.view.app;

import android.app.Fragment;

import com.goaamigo.travel.R;
import com.goaamigo.travel.module.common.view.app.AbstractDrawerActivity;
import com.goaamigo.travel.module.common.view.app.NavigationDrawerFragment;

public class TripActivity extends AbstractDrawerActivity {

    @Override
    protected boolean confirmExit() {
        return false;
    }

    @Override
    protected boolean hasParent() {
        return false;
    }

    @Override
    protected int getLayoutID() {
        return R.layout.activity_itinerary;
    }

    @Override
    protected Object getEventManager() {
        return new EventManager();
    }

    @Override
    protected Fragment getInitialFragment() {
        return new ItineraryFragment();
    }

    @Override
    protected int getFragmentContainerId() {
        return R.id.container;
    }

    private class EventManager {

        public void onEvent(NavigationDrawerFragment.DrawerItemClickedEvent event) {
            if (!isDestroyed()) {
                // Do something when button is clicked
            }
        }
    }
}
