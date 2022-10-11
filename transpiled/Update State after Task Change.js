function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading)
        return;
    var impact = parseInt(g_form.getValue('impact'));
    var urgency = parseInt(g_form.getValue('urgency'));
    var priority = parseInt(g_form.getValue('priority'));
    if (newValue.trim().length == 0) {
        if (isNaN(urgency))
            urgency = 2;
        if (isNaN(impact))
            impact = 2;
        var value = urgency + impact - 1;
        if (priority != value)
            g_form.setValue('priority', value);
    } else {
        var gr = new GlideRecord('task');
        gr.query('sys_id', newValue, function(gr) {
            var v, i, u;
            if (gr.next()) {
                var mapGr = new GlideRecord('x_44813_persactivt_state_mapping');
                var state = parseInt(gr.getValue('state'));
                if (!isNaN(state)) {
                    mapGr.addQuery('table', gr.getTableName());
                    mapGr.addQuery('source', state);
                    mapGr.addQuery('inactive', false);
                    mapGr.query(function(mapGr) {
                        var mapped;
                        if (mapGr.next()) {
                            mapped = parseInt(mapGr.getValue('mapped'));
                            if (isNaN(mapped))
                                return;
                        } else if (state < 0)
                            mapped = -5;
                        else if (state > 3)
                            mapped = 3;
                        else
                            mapped = (state > 0) ? state : 1;
                        if (mapped != state)
                            g_form.setValue('state', mapped);
                    });
                }
                var p = parseInt('' + gr.priority);
                i = parseInt(gr.getValue('impact'));
                if (isNaN(i))
                    i = 2;
                u = parseInt(gr.getValue('urgency'));
                if (isNaN(u))
                    u = 2;
                if (impact != i)
                    g_form.setValue('impact', i);
                if (urgency != u)
                    g_form.setValue('urgency', u);
                if (!isNaN(p)) {
                    g_form.setValue('priority', p);
                    return;
                }
            } else {
                u = isNaN(urgency) ? 2 : urgency;
                i = isNaN(impact) ? 2 : impact;
            }
            v = i + u - 1;
            if (priority != value)
                g_form.setValue('priority', value);
        });
    }
}
