package com.goaamigo.travel.module.common.view.app;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.goaamigo.travel.R;
import com.goaamigo.travel.infra.network.NetworkManager;

import de.greenrobot.event.EventBus;

public class NetworkFragment extends Fragment {

    private NetworkManager networkManager;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.fragment_no_network, container, false);
        networkManager = new NetworkManager(getActivity());
        Button btnRetry = (Button) root.findViewById(R.id.btn_retry);
        btnRetry.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (networkManager.isConnected()) {
                    EventBus.getDefault().post(new NetworkConnectedEvent());
                }
            }
        });
        return root;
    }

    public static class NetworkErrorEvent {
    }

    public static class NetworkConnectedEvent {
    }
}