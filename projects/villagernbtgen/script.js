function generateNBT() {
    const villagerName = document.getElementById("villagerName").value || "Villager";
    const health = document.getElementById("health").value || 20;
    const luck = document.getElementById("luck").value || 0;
    const movement = document.getElementById("movement").value || 0.1;
    const itemName = document.getElementById("itemName").value || "minecraft:diamond_sword";
    const itemLore = document.getElementById("itemLore").value || "Forged by Villager";
    const enchantID = document.getElementById("enchantID").value || 0;
    const enchantLevel = document.getElementById("enchantLevel").value || 1;

    // Generate the NBT JSON data as a single line
    const nbtData = `{"Count":1,"Damage":0,"Name":"minecraft:villager","WasPickedUp":0,"tag":{"Attributes":[{"Base":${luck},"Current":${luck},"DefaultMax":1024.0,"DefaultMin":-1024.0,"Max":1024.0,"Min":-1024.0,"Name":"minecraft:luck"},{"Base":${health},"Current":${health},"DefaultMax":1024.0,"DefaultMin":0.0,"Max":1024.0,"Min":0.0,"Name":"minecraft:health"},{"Base":${movement},"Current":${movement},"DefaultMax":1.0,"DefaultMin":0.0,"Max":1.0,"Min":0.0,"Name":"minecraft:movement"}],"CustomName":"§2${villagerName}","Invulnerable":1,"Offers":{"Recipes":[{"buyA":{"Count":1,"Damage":0,"Name":"minecraft:emerald"},"sell":{"Count":1,"Damage":0,"Name":"${itemName}","tag":{"display":{"Lore":["${itemLore}"],"Name":"${itemName}"},"ench":[{"id":${enchantID},"lvl":${enchantLevel}]}}},"maxUses":-1,"priceMultiplierA":1.0,"rewardExp":1,"tier":0,"traderExp":10,"uses":0}]},"Persistent":1,"definitions":["+minecraft:villager_v2","+villager_skin_1","+adult","+armorer"]}}`;

    document.getElementById("nbtOutput").value = nbtData;
}