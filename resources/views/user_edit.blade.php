@extends('master')

@section('content')

<h2>Edit</h2>

@if (session()->has('message'))
    {{session()->get('message')}}
    </div>
@endif
<form action="{{ route('users.update', ['user' => $user->id]) }}" method="POST">
    @csrf
    <input type="hidden" name="_method" value="PUT">
    <input type="text" name="firstName" value="{{ $user->firstName }}">
    <input type="text" name="lastName" value="{{ $user->lastName }}">
    <input type="text" name="email" value="{{ $user->email }}">
    <button type="submit">Save</button>
</form>

@endsection
