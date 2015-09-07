package com.goaamigo.travel.module.trip.widget;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.ViewGroup;

import com.goaamigo.travel.databinding.ItemEventBinding;
import com.goaamigo.travel.module.trip.model.Event;

import java.util.List;

public class EventAdapter
        extends RecyclerView.Adapter<EventAdapter.ViewHolder> {

    private static final String TAG = EventAdapter.class.getName();
    private final List<Event> eventsList;
    protected final Context context;
    protected final LayoutInflater inflater;


    public EventAdapter(Context context, List<Event> itinerayEvents) {
        this.context = context;
        this.inflater = (LayoutInflater) context
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        this.eventsList = itinerayEvents;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        return new ViewHolder(ItemEventBinding.inflate(inflater));
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int i) {
        Event currentEvent = eventsList.get(i);
        viewHolder.eventCardView.setEvent(currentEvent);
    }

    @Override
    public int getItemCount() {
        return eventsList.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public ItemEventBinding eventCardView;

        public ViewHolder(ItemEventBinding eventCardView) {
            super(eventCardView.getRoot());
            this.eventCardView = eventCardView;
        }
    }
}


