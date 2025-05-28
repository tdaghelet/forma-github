setup() {
  DIR="$(cd "$(dirname "$BATS_TEST_FILENAME")" >/dev/null 2>&1 && pwd)"
  PATH="$DIR/../scripts:$PATH"

  load "$DIR/test_helper/bats-support/load"
  load "$DIR/test_helper/bats-assert/load"
}

@test "addition.sh 5+5 = 10" {
  run scripts/addition.sh 5 5
  assert_success
  assert_output "10"
}

@test "addition.sh with missing arguments" {
  run scripts/addition.sh
  assert_failure 3
  assert_output "command line arguments are missing"
}

@test "addition.sh with one argument" {
  run scripts/addition.sh 5
  assert_failure 3
  assert_output "command line arguments are missing"
}

@test "hello-world.sh" {
  run scripts/hello-world.sh
  assert_success
  assert_output --partial "Hello"
  refute_output --partial "Hola"
}

@test "palindrome.sh with a palindrome" {
  run scripts/palindrome.sh kayak
  assert_success
  assert_output --partial "is a palindrome"
}

@test "palindrome.sh end with palindrome word" {
  run scripts/palindrome.sh kayak
  assert_success
  assert_output --regexp "^.*palindrome$"
}