# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## supabase table query

```tsx
-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create table
  public.profiles (
    id uuid references auth.users not null,
    updated_at timestamp with time zone,
    username text unique,
    avatar_url text,
    website text,
    primary key (id),
    unique (username),
    constraint username_length check (char_length(username) >= 3)
  );

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles for
select
  using (true);

create policy "User can insert their own profile." on profiles for insert
with
  check (auth.uid () = id);

begin;

drop publication if exists supabase_realtime;

create publication supabase_realtime;

commit;

alter publication supabase_realtime
add table profiles;

insert into
  storage.buckets (id, name)
values
  ('avatars', 'avatars');

create policy "Avatar images are publicly accessible." on storage.objects for
select
with
  check (bucket_id = 'avatars');

create policy "Avatar can upload an avatar." on storage.objects for insert
with
  check (bucket_id = 'avatars');

create policy "Avatar can upload an avatar." on storage.objects
for update
with
  check (bucket_id = 'avatars');

create policy "Avatar can upload an avatar." on storage.objects
for update
with
  check (bucket_id = 'avatars');

create policy "Avatar images are publicly accessible." on storage.objects for
select
with
  check (bucket_id = 'avatars');

create policy "Avatar can upload an avatar." on storage.objects for insert
with
  check (bucket_id = 'avatars');
```
