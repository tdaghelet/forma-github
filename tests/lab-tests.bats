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