function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '')
        return;
    var sys_id = g_form.getValue('task');
    if (sys_id.trim().length == 0)
        return;
    var impact = parseInt(g_form.getValue('impact'));
    if (isNaN(impact))
        impact = 2;
    var priority = parseInt(g_form.getValue('priority'));
    var urgency = parseInt(newValue);
    if (isNaN(urgency))
        urgency = 2;
    var value = urgency + impact - 1;
    if (priority != value)
        g_form.setValue('priority', value);
}
