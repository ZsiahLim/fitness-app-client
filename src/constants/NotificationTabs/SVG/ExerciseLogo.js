import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';

export const exerciseLogo = {
    rope: (size) => <MaterialCommunityIcons name="jump-rope" size={size} color="#fff" />,
    yoga: (size) => <MaterialCommunityIcons name="yoga" size={size} color="#fff" />,
    cycling: (size) => <Ionicons name="md-bicycle-sharp" size={size} color="#fff" />,
    lose: (size) => <FontAwesome5 name="weight" size={size} color="#fff" />,
    strength: (size) => <MaterialCommunityIcons name="weight-lifter" size={size} color="#fff" />,
    cooldown: (size) => <Feather name="battery-charging" size={size} color="#fff" />,
    warmup: (size) => <FontAwesome5 name="hotjar" size={size} color="#fff" />,
    run: (size) => <FontAwesome5 name="running" size={size} color="#fff" />,
    walk: (size) => <MaterialIcons name="directions-walk" size={size} color="#fff" />,
}