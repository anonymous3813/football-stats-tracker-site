<script lang="ts">
    import DropDown from "../../components/DropDown.svelte";
    import ButtonGroup from "../../components/ButtonGroup.svelte";

    let selected = $state('Item 1');
</script>

<ButtonGroup
    buttonItems={['Item 1', 'Item 2', 'Item 3']}
    selectedButton={selected}
    onclick={(item: string) => (selected = item)}
></ButtonGroup>
