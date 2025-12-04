import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import InputField from '../components/InputField';
import SelectField, { SelectOption } from '../components/SelectField';
import { RootStackNavigationType } from '../navigation/RootStackNatigationType';

type PlayerFormState = {
  playerName: string;
  role: string;
  teamName: string;
  countryName: string;
  age: string;
  battingStyle: string;
  uniquePlayerId: string;
  runsScored: string;
  centuriesScored: string;
  wicketsTaken: string;
};

const teamOptions: SelectOption[] = [
  { label: 'Chennai Super Kings', value: 'Chennai Super Kings' },
  { label: 'Mumbai Indians', value: 'Mumbai Indians' },
  { label: 'Royal Challengers Bengaluru', value: 'Royal Challengers Bengaluru' },
  { label: 'Kolkata Knight Riders', value: 'Kolkata Knight Riders' },
  { label: 'Rajasthan Royals', value: 'Rajasthan Royals' },
  { label: 'Sunrisers Hyderabad', value: 'Sunrisers Hyderabad' },
  { label: 'Lucknow Super Giants', value: 'Lucknow Super Giants' },
  { label: 'Delhi Capitals', value: 'Delhi Capitals' },
  { label: 'Punjab Kings', value: 'Punjab Kings' },
  { label: 'Gujarat Titans', value: 'Gujarat Titans' },
];

const countryOptions: SelectOption[] = [
  { label: 'India', value: 'India' },
  { label: 'Australia', value: 'Australia' },
  { label: 'England', value: 'England' },
  { label: 'South Africa', value: 'South Africa' },
  { label: 'New Zealand', value: 'New Zealand' },
  { label: 'Sri Lanka', value: 'Sri Lanka' },
  { label: 'Pakistan', value: 'Pakistan' },
  { label: 'Afghanistan', value: 'Afghanistan' },
  { label: 'Bangladesh', value: 'Bangladesh' },
  { label: 'West Indies', value: 'West Indies' },
];

const roleOptions: SelectOption[] = [
  { label: 'Batter', value: 'batter' },
  { label: 'Bowler', value: 'bowler' },
  { label: 'All-Rounder', value: 'all-rounder' },
  { label: 'Wicket-Keeper', value: 'wicket-keeper' },
];

const battingStyleOptions: SelectOption[] = [
  { label: 'Right-hand bat', value: 'Right-hand bat' },
  { label: 'Left-hand bat', value: 'Left-hand bat' },
  { label: 'Right-hand bat / Off break', value: 'Right-hand bat / Off break' },
  { label: 'Left-hand bat / Leg break', value: 'Left-hand bat / Leg break' },
];

const initialState: PlayerFormState = {
  playerName: '',
  role: '',
  teamName: '',
  countryName: '',
  age: '',
  battingStyle: '',
  uniquePlayerId: '',
  runsScored: '',
  centuriesScored: '',
  wicketsTaken: '',
};

const AddPlayerScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackNavigationType>>();
  const [form, setForm] = useState<PlayerFormState>(initialState);
  const [isCustomId, setIsCustomId] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Suggest a unique id when name/team change unless the user has overridden it.
  useEffect(() => {
    if (isCustomId) return;
    const suggested = buildUniqueId(form.teamName, form.playerName);
    setForm(prev => ({ ...prev, uniquePlayerId: suggested }));
  }, [form.teamName, form.playerName, isCustomId]);

  const handleChange = (key: keyof PlayerFormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const submit = () => {
    const validationErrors: Record<string, string> = {};
    const requiredFields: (keyof PlayerFormState)[] = [
      'playerName',
      'role',
      'teamName',
      'countryName',
      'age',
      'battingStyle',
      'uniquePlayerId',
    ];

    requiredFields.forEach(field => {
      if (!form[field]) {
        validationErrors[field] = 'Required';
      }
    });

    const parsedAge = Number(form.age);
    const parsedRuns = Number(form.runsScored || 0);
    const parsedCenturies = Number(form.centuriesScored || 0);
    const parsedWickets = Number(form.wicketsTaken || 0);

    if (form.age && Number.isNaN(parsedAge)) validationErrors.age = 'Enter a number';
    if (form.runsScored && Number.isNaN(parsedRuns)) validationErrors.runsScored = 'Enter a number';
    if (form.centuriesScored && Number.isNaN(parsedCenturies)) validationErrors.centuriesScored = 'Enter a number';
    if (form.wicketsTaken && Number.isNaN(parsedWickets)) validationErrors.wicketsTaken = 'Enter a number';

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    const payload = {
      playerName: form.playerName.trim(),
      // image skipped for now
      role: form.role,
      teamName: form.teamName,
      countryName: form.countryName,
      age: parsedAge,
      battingStyle: form.battingStyle,
      uniquePlayerId: form.uniquePlayerId.trim(),
      runsScored: parsedRuns,
      centuriesScored: parsedCenturies,
      wicketsTaken: parsedWickets,
    };

    console.log('Submitting player', payload);
    Alert.alert('Saved', `${payload.playerName} added`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const resetForm = () => {
    setForm(initialState);
    setIsCustomId(false);
    setErrors({});
  };

  const headerSubtitle = useMemo(() => {
    if (!form.teamName) return 'Pick a team to scope the player';
    return `${form.teamName} • ${form.role || 'Role?'}`;
  }, [form.teamName, form.role]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Add Player</Text>
        <Text style={styles.subtitle}>{headerSubtitle}</Text>

        <InputField
          label="Player Name"
          value={form.playerName}
          onChangeText={text => handleChange('playerName', text)}
          placeholder="Ruturaj Gaikwad"
          error={errors.playerName}
          autoCapitalize="words"
        />

        <SelectField
          label="Role"
          placeholder="Select role"
          value={form.role}
          options={roleOptions}
          onSelect={value => handleChange('role', value)}
          error={errors.role}
        />

        <SelectField
          label="Team"
          placeholder="Select team"
          value={form.teamName}
          options={teamOptions}
          onSelect={value => handleChange('teamName', value)}
          error={errors.teamName}
        />

        <SelectField
          label="Country"
          placeholder="Select country"
          value={form.countryName}
          options={countryOptions}
          onSelect={value => handleChange('countryName', value)}
          error={errors.countryName}
        />

        <SelectField
          label="Batting Style"
          placeholder="Select style"
          value={form.battingStyle}
          options={battingStyleOptions}
          onSelect={value => handleChange('battingStyle', value)}
          error={errors.battingStyle}
        />

        <InputField
          label="Age"
          value={form.age}
          onChangeText={text => handleChange('age', text)}
          placeholder="28"
          keyboardType="numeric"
          error={errors.age}
        />

        <InputField
          label="Unique Player ID"
          value={form.uniquePlayerId}
          onChangeText={text => {
            handleChange('uniquePlayerId', text);
            setIsCustomId(true);
          }}
          placeholder="CSK-RG-2025"
          error={errors.uniquePlayerId}
          helper="Ensure this stays unique for the roster."
        />

        <InputField
          label="Runs Scored"
          value={form.runsScored}
          onChangeText={text => handleChange('runsScored', text)}
          placeholder="2384"
          keyboardType="numeric"
          error={errors.runsScored}
        />

        <InputField
          label="Centuries"
          value={form.centuriesScored}
          onChangeText={text => handleChange('centuriesScored', text)}
          placeholder="2"
          keyboardType="numeric"
          error={errors.centuriesScored}
        />

        <InputField
          label="Wickets"
          value={form.wicketsTaken}
          onChangeText={text => handleChange('wicketsTaken', text)}
          placeholder="0"
          keyboardType="numeric"
          error={errors.wicketsTaken}
        />

        <View style={styles.actions}>
          <TouchableOpacity style={styles.secondaryButton} onPress={resetForm}>
            <Text style={styles.secondaryText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={submit}>
            <Text style={styles.primaryText}>Save Player</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

function buildUniqueId(teamName: string, playerName: string) {
  if (!teamName && !playerName) return '';
  const teamCode =
    teamName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase() || 'TEAM';
  const nameCode =
    playerName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase() || 'PLR';
  return `${teamCode}-${nameCode}-2025`;
}

export default AddPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    color: '#0f172a',
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: '#475569',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 10,
  },
  primaryText: {
    color: '#0f172a',
    fontWeight: '700',
  },
  secondaryButton: {
    width: 100,
    backgroundColor: '#e2e8f0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  secondaryText: {
    color: '#0f172a',
    fontWeight: '600',
  },
});
