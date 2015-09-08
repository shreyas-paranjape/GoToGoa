package com.goaamigo.travel.module.trip.view.app;

import android.app.Fragment;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.goaamigo.travel.R;
import com.goaamigo.travel.module.trip.model.Event;
import com.goaamigo.travel.module.trip.widget.EventAdapter;

import java.util.ArrayList;
import java.util.List;

public class ItineraryFragment extends Fragment {

    //dummy data for testing
    private final List<Event> eventList = new ArrayList<>();

    public ItineraryFragment() {
        eventList.add(new Event());
        eventList.add(new Event());
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        RecyclerView recyclerView = (RecyclerView) inflater.inflate(R.layout.fragment_itinerary, container, false);
        recyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        recyclerView.setAdapter(new EventAdapter(getActivity(), eventList));
        return recyclerView;
    }
}
